import { useQuery } from '@/hooks';
import { Loader } from '@/ui-kit';
import ConversationRow from './components/ConversationRow';
import { MessagesService } from '@/lib/service';
import { ConversationsResponse } from '@/lib/global/types';

const ConversationsPage = () => {
  const messagesService = new MessagesService();
  const { data: conversations, loading }: { data: ConversationsResponse; loading: boolean } = useQuery(() =>
    messagesService.getRooms(),
  );

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
