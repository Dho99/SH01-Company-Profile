type Props = {
    title: string;
    message: string;
};

export function ChatbotMessage({
    title,
    message,
}: Props) {
    return (
        <div className="mb-5 max-w-[92%] rounded-2xl rounded-bl-md bg-white p-4 shadow-sm">

            <h4 className="text-sm font-semibold text-slate-900">
                {title}
            </h4>

            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                {message}
            </p>

        </div>
    );
}