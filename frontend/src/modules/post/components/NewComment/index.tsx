import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Form, SymbolCounter } from '@/components';
import { SubmitButton, Textarea } from '@/ui-kit';

import styles from './styles.module.scss';

type NewCommentProps = {
  publish: (text: string) => void;
  loading: boolean;
};

const MAX_COMMENT_LENGTH = 256;

const NewComment = ({ publish, loading }: NewCommentProps) => {
  const { t } = useTranslation();
  const [commentText, setCommentText] = useState('');

  const onSubmit = async () => {
    await publish(commentText);
    setCommentText('');
  };

  return (
    <Form
      className={styles.newComment}
      onSubmit={onSubmit}
    >
      <Textarea
        value={commentText}
        onChange={setCommentText}
        placeholder={t('Write a comment') as string}
        maxLength={MAX_COMMENT_LENGTH}
      />
      <div className={styles.newCommentFooter}>
        <SubmitButton
          title={t('Comment')}
          disabled={!commentText.trim() || loading}
        />
        <SymbolCounter
          value={commentText}
          max={MAX_COMMENT_LENGTH}
        />
      </div>
    </Form>
  );
};

export default NewComment;
