import { useQuery } from '@/hooks';
import { Loader } from '@/ui-kit';
import ConversationRow from './components/ConversationRow';
import { MessagesService } from '@/lib/service';

const ConversationsPage = () => {
  const messagesService = new MessagesService();
  const { data: conversations, loading } = useQuery(() => messagesService.getRooms());

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        conversations.map((conversation) => (
          <ConversationRow
            key={conversation.id}
            {...conversation}
          />
        ))
      )}
    </div>
  );
};

export default ConversationsPage;
