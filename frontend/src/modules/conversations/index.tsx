import { useTranslation } from 'react-i18next';

import { useQuery } from '@/hooks';
import { MessagesService } from '@/lib/service';
import { ConversationsResponse, QueryError } from '@/lib/global/types';
import { EmptyListMessage, PageWrapper } from '@/components';

import ConversationRow from './ConversationRow';

const ConversationsPage = () => {
  const { t } = useTranslation();

  const messagesService = new MessagesService();

  const {
    data: conversations,
    loading,
    error,
  }: { data: ConversationsResponse; loading: boolean; error: QueryError } = useQuery(() => messagesService.getRooms());

  return (
    <PageWrapper
      loading={loading}
      error={error}
    >
      {!conversations?.length ? (
        <EmptyListMessage text={t('No conversations')} />
      ) : (
        <>
          {conversations.map((conversation) => (
            <ConversationRow
              key={conversation.id}
              {...conversation}
            />
          ))}
        </>
      )}
    </PageWrapper>
  );
};

export default ConversationsPage;
