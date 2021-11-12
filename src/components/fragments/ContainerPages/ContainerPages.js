import React, { useState } from 'react';
import styles from './styles.module.css';

import { Button, ButtonDropdown } from '../../elements';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

export default function ContainerPages(props) {
  const {
    children,
    dataDropdown,
    handleClick,
    title,
    listView,
    listItem,
    setSelectedParentTab,
    className,
    btnEdit,
  } = props;
  const [selectedTab, setSelectedTab] = useState({ activeTab: 1 });

  const classes = [styles.root, className].filter(Boolean).join(' ');

  const _handleTab = (idx) => {
    setSelectedTab({ activeTab: idx + 1 });
    setSelectedParentTab && setSelectedParentTab({ activeTab: idx + 1 });
  };

  return (
    <section className={classes}>
      <section>
        <h1>{title}</h1>
        {listView && (
          <ButtonDropdown
            color="yellow"
            dataDropdown={dataDropdown}
            label="Tambah Data"
            className={styles.rootButton}
            smallBtn
          />
        )}
        {btnEdit && (
          <Button
            color="blue"
            iconBtn={faPlusSquare}
            smallBtn
            onClick={handleClick}
          />
        )}
      </section>
      <section className={styles.content}>
        <div className={listItem && styles.tabControl}>
          {listItem &&
            listItem.map((i, idx) => (
              <React.Fragment key={idx}>
                {selectedTab.activeTab === idx + 1 ? (
                  <Button
                    className={styles.active}
                    label={i.tabTitle}
                    key={idx}
                  />
                ) : (
                  <Button
                    className={styles.inactive}
                    label={i.tabTitle}
                    onClick={() => _handleTab(idx)}
                    key={idx}
                  />
                )}
              </React.Fragment>
            ))}
        </div>
        <div>
          {children}
        </div>
      </section>
    </section>
  );
}
