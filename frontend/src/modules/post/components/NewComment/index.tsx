import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Form, SymbolCounter } from '@/components';
import { SubmitButton, Textarea } from '@/ui-kit';

import styles from './styles.module.scss';
import FIELDS_VALIDATION_RULES from '@/lib/constants/fields-validation-rules';

type NewCommentProps = {
  publish: (text: string) => void;
  loading: boolean;
};

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
        placeholder={t('Write a comment')}
        maxLength={FIELDS_VALIDATION_RULES.COMMENT_TEXT.MAX}
      />
      <div className={styles.newCommentFooter}>
        <SubmitButton
          title={t('Comment')}
          disabled={!commentText.trim() || loading}
        />
        <SymbolCounter
          value={commentText}
          max={FIELDS_VALIDATION_RULES.COMMENT_TEXT.MAX}
        />
      </div>
    </Form>
  );
};

export default NewComment;
