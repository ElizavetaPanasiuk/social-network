import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Textarea } from "@/ui-kit";

type CreatePostProps = {
  addPost: (text: string) => void;
};

const CreatePost = ({ addPost }: CreatePostProps) => {
  const { t } = useTranslation();
  const [text, setText] = useState("");

  const publish = async () => {
    await addPost(text);
    setText("");
  };

  return (
    <Box>
      <Textarea
        placeholder={t("What's new?") as string}
        value={text}
        onChange={setText}
      />
      <Button title={t("Publish")} onClick={publish} size="small" />
    </Box>
  );
};

export default CreatePost;
