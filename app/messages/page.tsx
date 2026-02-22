import { getMessages } from "@/app/actions";
import { MessageBoard } from "@/components/landing/MessageBoard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MessagesPage() {
    const result = await getMessages();

    return <MessageBoard messages={result.messages} />;
}
