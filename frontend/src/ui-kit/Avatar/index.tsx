import styles from "./styles.module.scss";

type AvatarProps = {
  alt: string;
  src: string;
};

const Avatar = ({ alt, src }: AvatarProps) => {
  return <img className={styles.avatar} alt={alt} src={src} />;
};

export default Avatar;
