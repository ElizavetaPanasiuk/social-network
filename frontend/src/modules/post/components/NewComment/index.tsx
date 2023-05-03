import { useState } from 'react';
import { Button, Textarea } from '@/ui-kit';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

type NewCommentProps = {
  publish: (text: string) => void;
};

const NewComment = ({ publish }: NewCommentProps) => {
  const { t } = useTranslation();
  const [commentText, setCommentText] = useState('');

  const onPublish = async () => {
    await publish(commentText);
    setCommentText('');
  };

  return (
    <div className={styles.newComment}>
      <Textarea
        value={commentText}
        onChange={setCommentText}
        placeholder={t('Write a comment') as string}
      />
      <Button
        title={t('Comment')}
        onClick={onPublish}
      />
    </div>
  );
};

export default NewComment;
