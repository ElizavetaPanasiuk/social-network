import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Form } from '@/components';
import { SubmitButton, Textarea } from '@/ui-kit';

import styles from './styles.module.scss';

type NewPostProps = {
  publish: (text: string) => void;
  loading: boolean;
};

const NewPost = ({ publish, loading }: NewPostProps) => {
  const { t } = useTranslation();
  const [postText, setPostText] = useState('');

  const onSubmit = async () => {
    await publish(postText);
    setPostText('');
  };

  return (
    <Form
      className={styles.newPost}
      onSubmit={onSubmit}
    >
      <Textarea
        value={postText}
        onChange={setPostText}
        placeholder={t("What's new?")}
      />
      <SubmitButton
        title={t('Publish')}
        disabled={!postText.trim() || loading}
      />
    </Form>
  );
};

export default NewPost;
