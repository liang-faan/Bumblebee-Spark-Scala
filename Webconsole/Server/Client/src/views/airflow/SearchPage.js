import React from 'react'
import {
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CInputGroupAppend,
    CInput
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const SearchPage = () => {

    return (
        <div className={'mt-2 col-6'}>
            <CInputGroup>
                <CInputGroupPrepend>
                    <CInputGroupText className={'bg-info text-white'}>Books</CInputGroupText>
                </CInputGroupPrepend>
                <CInput type="text" id="searchInput" name="searchInput" />
                <CInputGroupAppend>
                    <CInputGroupText className={'bg-info text-white'}>
                        <CIcon name="cilSearch" />
                    </CInputGroupText>
                </CInputGroupAppend>
            </CInputGroup>
        </div>
    )

}

export default SearchPage
