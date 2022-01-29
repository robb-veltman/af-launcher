import React, { useState } from 'react'
import { Tab, makeStyles, darken } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'

import { NewsTab } from './NewsTab'
import { PatchNotesTab } from './PatchNotesTab'

const useStyles = makeStyles(theme => ({
  tabsContainer: {
    backgroundColor: theme.palette.primary.dark,
    '& .indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      '& > span': {
        maxWidth: 60,
        width: '100%',
        backgroundColor: theme.palette.primary.main,
        filter: 'blur(1.5px)',
      }
    }
  },
  tabList: {

  },
  tab: {
    color: theme.palette.secondary.main,
    fontFamily: 'InformaPro',
    fontSize: '18px',
  },
  tabPanel: {
    overflowY: 'scroll',
    height: '50vh',

    '&::-webkit-scrollbar': {
      background: 'transparent',
      width: 4,
    },
    '&::-webkit-scrollbar-thumb': {
      // backgroundColor: theme.palette.secondary.main,
      backgroundColor: 'white',
    },
  },
}))

type TabValue = 'news' | 'patchNotes'

export const MainTabs: React.FC = () => {
  const cl = useStyles()
  const [tabValue, setTabValue] = useState <TabValue>('news')
  const onTabChange = (_: any, value: TabValue) => {
    setTabValue(value)
  }
  return (
    <div className={cl.tabsContainer}>
      <TabContext value={tabValue}>
        <TabList
          centered
          className={cl.tabList}
          classes={{ indicator: 'indicator' }}
          TabIndicatorProps={{ children: <span /> }}
          onChange={onTabChange}
        >
          <Tab
            className={cl.tab}
            label="NEWS"
            disableRipple
            value="news"
          />
          <Tab
            className={cl.tab}
            label="PATCH NOTES"
            disableRipple
            value="patchNotes"
          />
        </TabList>
        <TabPanel className={cl.tabPanel} value="news">
          <NewsTab />
        </TabPanel>
        <TabPanel className={cl.tabPanel} value="patchNotes">
          <PatchNotesTab />
        </TabPanel>
      </TabContext>
    </div>
  )
}