import styles from "./MegaSocialProof.module.css";

const AVATARS = [
  "https://i.pravatar.cc/96?img=12",
  "https://i.pravatar.cc/96?img=32",
  "https://i.pravatar.cc/96?img=45",
];

export function MegaSocialProof() {
  return (
    <aside className={styles.block} aria-label="Customer story">
      <div className={styles.avatars}>
        {AVATARS.map((src, i) => (
          <img
            key={src}
            className={styles.avatar}
            src={src}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            style={{ zIndex: AVATARS.length - i }}
          />
        ))}
      </div>
      <p className={styles.copy}>
        From flexible fits to durable picks, our catalog helps you compare cars,
        bikes, phones, and computers without compromising clarity.
      </p>
    </aside>
  );
}
