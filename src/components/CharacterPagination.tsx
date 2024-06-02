import { Pagination } from '@mui/material';
import React from 'react';

interface CharacterPaginationProps {
    currentPage: number;
    pageCount: number;
    onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const CharacterPagination = ({
    currentPage,
    pageCount,
    onChange,
}: CharacterPaginationProps) => {
    return (
        <Pagination
            page={currentPage}
            count={pageCount}
            variant="outlined"
            shape="rounded"
            sx={{ alignSelf: 'center' }}
            onChange={onChange}
        />
    );
};

export default CharacterPagination;
