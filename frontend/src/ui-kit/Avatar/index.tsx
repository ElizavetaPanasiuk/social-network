import styles from "./styles.module.scss";

type AvatarProps = {
  alt: string;
  src: string;
  size?: "small" | "medium" | "large";
};

const Avatar = ({ alt, src, size = "small" }: AvatarProps) => {
  return (
    <img className={`${styles.avatar} ${styles[size]}`} alt={alt} src={src} />
  );
};

export default Avatar;
