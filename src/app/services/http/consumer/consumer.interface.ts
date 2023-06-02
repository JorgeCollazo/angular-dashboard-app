export class IConsumer {
    data?: any;
    success: boolean = false;
    message: IMessage = { title: '', message: '' };
}

export class IMessage {
    title: string = '';
    message: string = '';
}
