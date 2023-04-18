import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button } from "@/ui-kit";
import { Post } from "../types";
import styles from "./styles.module.scss";

type CreatePostProps = {
  addPost: (post: Post) => void;
};

const CreatePost = ({ addPost }: CreatePostProps) => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const publish = () => {
    addPost({
      id: 3,
      avatar:
        "https://avatars.mds.yandex.net/i?id=bb951d00a0cb85705e3fb55d825cb1340a0a6b18-8498443-images-thumbs&n=13",
      firstName: "Lizaveta",
      lastName: "Panasiuk",
      createdAt: new Date(),
      text,
    }); // потом будет браться из респонса запроса на бэкенд
    setText("");
  };

  return (
    <Box>
      <textarea
        className={styles.createPostTextarea}
        placeholder={t("What's new?") as string}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
      />
      <Button title={t("Publish")} onClick={publish} size="small" />
    </Box>
  );
};

export default CreatePost;
