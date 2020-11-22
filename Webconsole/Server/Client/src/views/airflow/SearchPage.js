import React, { useState } from 'react'
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
    CDataTable
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { getRequest, constructAuthenticationHeaders } from '../../service/proxy/ApiProxy'
import { searchOptions } from '../../config'

const fields = ["title_text", "object_work_type"]

const SearchPage = () => {
    const [searchInput, setSearchInput] = useState();
    const [searchResult, setSearchResult] = useState();
    const handleSubmit = () => {

        console.log("start searching elastic search")
        console.log(searchInput);

        var hostUrl = searchOptions.url
        var searchIndex = searchOptions.searchIndex
        var searchAction = searchOptions.searchAction
        getRequest(hostUrl + searchIndex + searchAction + `?q=${searchInput}`, null, constructAuthenticationHeaders()).then(function (response) {
            // handle success
            console.log(response);
            var metadataList = response.data.map((item) =>
                item._source.metadata
            );
            setSearchResult(metadataList);

        }).catch(function (error) {
            // handle error
            console.log(error);
            setSearchResult(error)
        }).then(function () {
            // always executed
            console.log("Finish searching")
        });
    }
    // if (searchResult) {
    //     console.log(searchResult._source)
    // }

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

                        <CCardBody>
                            <CDataTable
                                items={searchResult}
                                fields={fields}
                                hover
                                striped
                                bordered
                                size="sm"
                                itemsPerPage={15}
                                pagination={{ 'align': 'center', 'size': 'lg' }}
                                scopedSlots={
                                    {
                                        'title_text': (item) => (
                                            <td>
                                                {item.title_text.length > 60 ? (item.title_text.substring(0,56) + "...") : item.title_text}
                                            </td>
                                        ),
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
