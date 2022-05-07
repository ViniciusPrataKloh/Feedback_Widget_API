export interface MailAdapterDTO {
    subject: string;
    body: string;
}

export interface MailAdapter {
    sendMail: (data: MailAdapterDTO) => void;
}