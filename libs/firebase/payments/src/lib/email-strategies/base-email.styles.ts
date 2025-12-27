export const baseEmailStyles = `
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { padding: 30px 20px; }
    .receipt { background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .receipt-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ddd; }
    .receipt-row:last-child { border-bottom: none; font-weight: bold; font-size: 18px; }
    .label { color: #666; }
    .value { font-weight: 600; }
    .footer { background-color: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 14px; }
    .footer a { color: #667eea; text-decoration: none; }
`;

export function formatDate(date: Date = new Date()): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function formatPaymentMethod(method: 'venmo' | 'card'): string {
    return method === 'venmo' ? 'Venmo' : 'Credit Card';
}
