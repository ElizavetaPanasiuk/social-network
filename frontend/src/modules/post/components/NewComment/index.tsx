import { useState } from 'react';
import { SubmitButton, Textarea } from '@/ui-kit';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { Form } from '@/components';

type NewCommentProps = {
  publish: (text: string) => void;
};

const NewComment = ({ publish }: NewCommentProps) => {
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
      />
      <SubmitButton title={t('Comment')} />
    </Form>
  );
};

export default NewComment;
