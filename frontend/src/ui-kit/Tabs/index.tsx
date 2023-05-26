import styles from './styles.module.scss';

export type Tab = {
  label: string;
  value: string;
};

type TabsProps = {
  tabs: Tab[];
  value: string;
  onChange: (tab: Tab) => void;
};

const Tabs = ({ tabs, value, onChange }: TabsProps) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.value}
          className={styles.tab}
          data-active={tab.value === value}
          onClick={() => onChange(tab)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
