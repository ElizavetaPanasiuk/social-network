import { useQuery } from '@/hooks';
import { Loader } from '@/ui-kit';
import ConversationRow from './components/ConversationRow';
import { MessagesService } from '@/lib/service';
import { ConversationsResponse } from '@/lib/global/types';
import { EmptyListMessage } from '@/components';
import { useTranslation } from 'react-i18next';

const ConversationsPage = () => {
  const { t } = useTranslation();
  const messagesService = new MessagesService();
  const { data: conversations, loading }: { data: ConversationsResponse; loading: boolean } = useQuery(() =>
    messagesService.getRooms(),
  );

  return loading ? (
    <Loader />
  ) : !conversations.length ? (
    <EmptyListMessage text={t('No conversations')} />
  ) : (
    conversations.map((conversation) => (
      <ConversationRow
        key={conversation.id}
        {...conversation}
      />
    ))
  );
};

export default ConversationsPage;
