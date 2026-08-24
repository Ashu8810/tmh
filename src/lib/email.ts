import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key');

export async function sendInviteEmail(email: string, token: string) {
  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/invite/${token}`;

  try {
    const data = await resend.emails.send({
      from: 'Team Motor Heads <noreply@teammotorheads.com>', // Update with verified domain
      to: email,
      subject: 'You have been invited to Team Motor Heads Secure Reports Vault',
      html: `
        <p>Hello,</p>
        <p>You have been invited to access the Team Motor Heads Secure Reports Vault.</p>
        <p>Please click the link below to set up your account and password. This link is valid for 24 hours.</p>
        <a href="${inviteUrl}">Accept Invite</a>
        <p>If you did not expect this invitation, please ignore this email.</p>
      `,
    });
    return data;
  } catch (error) {
    console.error('Failed to send invite email:', error);
    throw new Error('Failed to send invite email');
  }
}
