import React, { useState } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'
// import { DocsLink } from 'src/reusable'

import { retrieveDags } from '../../service/DagService'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 1: return 'success'
    case 0: return 'secondary'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const formatDate = strDate => {

  if(strDate === null){
    return ""
  }

  const date = new Date(strDate);
  return Intl.DateTimeFormat('en-US',{
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(date);
}

const fields = ['dagId', 'isPaused', 'isSubDag', 'isActive', 'lastSchedulerRun', 'lastExpired',  'owners', 'description', 'rootDagId']

const Tables = () => {
  const [dagsData, updateDag] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  if (firstLoad) {
    retrieveDags().then(function (res, err) {
      const usersDD = res;
      updateDag(usersDD);
    });
    setFirstLoad(false);
  }
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Airflow DAG List
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={dagsData}
                fields={fields}
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={15}
                pagination={{ 'align': 'center', 'size': 'lg' }}
                scopedSlots={{
                  'isActive':
                    (item) => (
                      <td>
                        <CBadge color={getBadge(item.isActive)}>
                          {item.isActive}
                        </CBadge>
                      </td>
                    ),
                    'lastSchedulerRun':(item) => (
                      <td>
                        {formatDate(item.lastSchedulerRun)}
                      </td>
                    ),
                    'lastExpired':(item) => (
                      <td>
                        {formatDate(item.lastExpired)}
                      </td>
                    ),
                    'description': (item) => (
                      <td>
                        {item.description ===null ? "" : item.description }
                      </td>
                    ),
                    'rootDagId': (item) => (
                      <td>
                        {item.rootDagId ===null ? "" : item.rootDagId }
                      </td>
                    ),

                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Tables
