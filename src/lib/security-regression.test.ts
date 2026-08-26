import assert from 'node:assert/strict';
import test from 'node:test';
import { isSessionFullyVerified } from './session';
import {
  accessibleFolderWhere,
  accessibleReportsWhere,
  canDownloadReport,
  canHardDeleteReport,
  canSoftDeleteReport,
} from './report-access';

test('pending MFA and inactive sessions are not fully authenticated', () => {
  assert.equal(isSessionFullyVerified(null), false);
  assert.equal(
    isSessionFullyVerified({ mfaVerified: false, user: { isActive: true } }),
    false,
  );
  assert.equal(
    isSessionFullyVerified({ mfaVerified: true, user: { isActive: false } }),
    false,
  );
  assert.equal(
    isSessionFullyVerified({ mfaVerified: true, user: { isActive: true } }),
    true,
  );
});

test('a supplied folder id never removes the role authorization predicate', () => {
  const where = accessibleReportsWhere({
    role: 'MEMBER',
    folderId: 'restricted-folder',
    isDeleted: false,
  });

  assert.equal(where.folderId, 'restricted-folder');
  assert.equal(where.isDeleted, false);
  assert.deepEqual(where.OR, [
    { folderId: null },
    { folder: { allowedRoles: { isEmpty: true } } },
    { folder: { allowedRoles: { has: 'MEMBER' } } },
  ]);
});

test('authorized and unauthorized folder lookups use the same id plus role filter', () => {
  assert.deepEqual(accessibleFolderWhere('MEMBER', 'folder-id'), {
    id: 'folder-id',
    OR: [
      { allowedRoles: { isEmpty: true } },
      { allowedRoles: { has: 'MEMBER' } },
    ],
  });
});

test('single-report access preserves id, deletion state, and role authorization', () => {
  const active = accessibleReportsWhere({
    id: 'report-id',
    role: 'CLUB_HEAD',
    isDeleted: false,
  });
  const deleted = accessibleReportsWhere({
    id: 'report-id',
    role: 'ADMIN',
    isDeleted: true,
  });

  assert.equal(active.id, 'report-id');
  assert.equal(active.isDeleted, false);
  assert.equal(deleted.id, 'report-id');
  assert.equal(deleted.isDeleted, true);
  assert.ok(active.OR);
  assert.deepEqual(deleted, {
    id: 'report-id',
    isDeleted: true,
  });
});

test('admins bypass folder role restrictions while non-admins remain scoped', () => {
  assert.deepEqual(accessibleFolderWhere('ADMIN', 'restricted-folder'), {
    id: 'restricted-folder',
  });
  assert.deepEqual(accessibleReportsWhere({
    id: 'report-id',
    role: 'ADMIN',
    isDeleted: false,
  }), {
    id: 'report-id',
    isDeleted: false,
  });
});

test('report action permissions match the production role matrix', () => {
  assert.equal(canDownloadReport('ADMIN'), true);
  assert.equal(canDownloadReport('CLUB_HEAD'), true);
  assert.equal(canDownloadReport('MEMBER'), false);
  assert.equal(canSoftDeleteReport('ADMIN'), true);
  assert.equal(canSoftDeleteReport('CLUB_HEAD'), true);
  assert.equal(canSoftDeleteReport('MEMBER'), false);
  assert.equal(canHardDeleteReport('ADMIN'), true);
  assert.equal(canHardDeleteReport('CLUB_HEAD'), false);
  assert.equal(canHardDeleteReport('MEMBER'), false);
});
