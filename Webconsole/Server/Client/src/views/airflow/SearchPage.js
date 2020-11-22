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
    CForm,
    CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {getRequest} from '../../service/proxy/ApiProxy'
import {searchOptions} from '../../config'


const SearchPage = () => {
    const [searchInput, setSearchInput] = useState();

    var searchResult=null;
    const handleSubmit = (evt) => {

        console.log("start searching elastic search")
        console.log(searchInput);
    
        var hostUrl = searchOptions.url
        var searchIndex = searchOptions.searchIndex
        var searchAction = searchOptions.searchAction
    
        searchResult = getRequest(hostUrl+searchIndex+searchAction+`?q=${searchInput}`)
        console.log(searchResult)
    }

    return (
        <>
            <CRow>
                <CCol>
                    <CForm onSubmit={handleSubmit}>
                        <CCard>
                            <CCardBody>
                                <CInputGroup>
                                    <CInputGroupPrepend>
                                        <CInputGroupText className={'bg-info text-white'}>Books</CInputGroupText>
                                    </CInputGroupPrepend>
                                    <CInput type="text" id="searchInput" name="searchInput" onChange={e => setSearchInput(e.target.value)}  />
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
                    </CForm>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader color="success">Searching Results</CCardHeader>
                    </CCard>
                    <CCardBody>

                    </CCardBody>
                </CCol>
                <CCol>
                    <CCard>
                        <CCardHeader color="primary">Recommendation</CCardHeader>
                        <CCardBody>
                            recommendations here
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

        </>
    )

}

export default SearchPage
