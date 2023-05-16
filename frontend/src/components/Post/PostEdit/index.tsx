import { useState } from 'react';
import { Textarea, SubmitButton } from '@/ui-kit';
import { useTranslation } from 'react-i18next';
import Form from '@/components/Form';

type PostEditProps = {
  postContent: string;
  onSave: (value: string) => void;
};

const PostEdit = ({ postContent, onSave }: PostEditProps) => {
  const { t } = useTranslation();
  const [text, setText] = useState(postContent);

  return (
    <Form onSubmit={() => onSave(text)}>
      <Textarea
        value={text}
        onChange={setText}
      />
      <SubmitButton title={t('Save')} />
    </Form>
  );
};

export default PostEdit;
