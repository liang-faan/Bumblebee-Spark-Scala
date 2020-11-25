import React, { useState } from 'react'
// import {consumeKafkaMessage} from '../../service/KafkaUtils'
import {
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CInputGroupAppend,
    CInput,
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CButton,
    CDataTable,
    CCollapse,
    CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { getRequest, constructAuthenticationHeaders } from '../../service/proxy/ApiProxy'
import { searchOptions } from '../../config'

// consumeKafkaMessage("testMessage");

const fields = [{ key: "title_text", label: "Books Name" },
{
    key: 'show_details',
    label: '',
    _style: { width: '1%%' },
    sorter: false,
    filter: false
}]

const SearchPage = () => {
    const [searchInput, setSearchInput] = useState();
    const [searchResult, setSearchResult] = useState();
    const [details, setDetails] = useState([])
    const handleSubmit = () => {
        setDetails([])
        setSearchResult(null)
        console.log("start searching elastic search")
        console.log(searchInput);
        if (searchInput === null || searchInput === "") {
            setSearchResult(null);
            return;
        }

        var hostUrl = searchOptions.url
        var searchIndex = searchOptions.searchIndex
        var searchAction = searchOptions.searchAction
        getRequest(hostUrl + searchIndex + searchAction + `?q=${searchInput}`, null, constructAuthenticationHeaders()).then(function (response) {
            // handle success
            console.log(response);
            if (Array.isArray(response.data)) {
                var metadataList = response.data.map((item) =>
                    item._source.metadata
                );

                // metadataList=metadataList.sort((a, b) => (a.accession_no_csv > b.accession_no_csv) ? 1 : (a.accession_no_csv === b.accession_no_csv) ? ((a.creation_date > b.creation_date) ? 1 : -1) : -1 )
                setSearchResult(metadataList);
            }

        }).catch(function (error) {
            // handle error
            console.log(error);
            setSearchResult(error)
        }).then(function () {
            // always executed
            console.log("Finish searching")
        });
    }

    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
        } else {
            newDetails = [...details, index]
        }
        setDetails(newDetails)
    }
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader className="bg-info text-white h5">
                            Demo for Collaborative Filtering Recommendations
                        </CCardHeader>
                        <CCardBody>
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText className={'bg-info text-white'}>Books</CInputGroupText>
                                </CInputGroupPrepend>
                                <CInput type="text" id="searchInput" name="searchInput" onChange={e => setSearchInput(e.target.value)} onKeyPress={event => { if (event.key === 'Enter') { handleSubmit() } }} />
                                <CInputGroupAppend>
                                    <CButton type="submit">
                                        <CInputGroupText className={'bg-info text-white'}>
                                            <CIcon name="cilSearch" />
                                        </CInputGroupText>
                                    </CButton>
                                </CInputGroupAppend>
                            </CInputGroup>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader color="success" className="text-white">Searching Results</CCardHeader>
                        <CCardBody color="white">
                            <CDataTable
                                items={searchResult}
                                fields={fields}
                                hover
                                bordered
                                size="sm"
                                itemsPerPage={10}
                                pagination={{ 'align': 'center', 'size': 'lg' }}
                                scopedSlots={
                                    {
                                        'title_text':
                                            (item, index) => {
                                                return (
                                                    <td>
                                                        <CLink onClick={() => { toggleDetails(index) }}> {item.title_text.replace(/^\?*/,'').replace(/\?{2,}$/,'')} </CLink>
                                                    </td>
                                                )
                                            },
                                        'show_details':
                                            (item, index) => {
                                                return (
                                                    <td>
                                                        <CButton
                                                            color="primary"
                                                            variant="outline"
                                                            shape="square"
                                                            size="sm"
                                                            onClick={() => { toggleDetails(index) }}
                                                        >
                                                            {details.includes(index) ? 'Hide' : 'Show'}
                                                        </CButton>
                                                    </td>
                                                )
                                            },
                                        'details':
                                            (item, index) => {
                                                return (
                                                    <CCollapse show={details.includes(index)}>
                                                        <CCardBody>
                                                            <h4>{item.title_text.replace(/^\?*/,'').replace(/\?{2,}$/,'')}</h4>
                                                            <h5>Creator: {item.creator_1 + ((item.creator_1 !== '' && item.creator_2 !== '' && item.creator_2 !== 'Unknow') ? '/' : '') + (item.creator_2 !== 'Unknow' ? item.creator_2 : '')}</h5>
                                                            <h5>Object Type: {item.object_work_type?item.object_work_type.replace(/^\?*/,'').replace(/\?{2,}$/,''):''}</h5>
                                                            <h5>Creation Date: {item.creation_date?item.creation_date:''}</h5>
                                                            <p>Context: {item.physical_appearance?item.physical_appearance.replace(/^\?*/,'').replace(/\?{2,}$/,''):''}</p>
                                                        </CCardBody>
                                                    </CCollapse>
                                                )
                                            }
                                    }
                                }
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol>
                    <CCard>
                        <CCardHeader color="primary" className="text-white">Recommendation</CCardHeader>
                        <CCardBody>
                            Recommendations here
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

        </>
    )

}

export default SearchPage
