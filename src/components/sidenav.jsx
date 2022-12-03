import React, { useState, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Sidenav({categories, brands, updateFilters}) {

    let [category, setCategory] = useState([]);
    let [brand, setBrand] = useState([]);
    let sort = ["Rating", "Discount", "Price : High to Low", "Price : Low to High"];
    const [sortCriteria, setSortCriteria] = useState("");

    const handleSort = (event) => {
        setSortCriteria(event.target.value);
    };
    

    const eventCategory = (e) => {
        setCategory(prevState => [...prevState, e.target.value]);
    }

    const eventBrand = (e) => {
        setBrand(prevState => [...prevState, e.target.value]);
    }

    useEffect(() => {
        updateFilters(category, brand, sortCriteria);
    }, [category, brand, sortCriteria])
    

    return (
        <div className="sidenav">
            <div className="Sort">
                <Box sx={{ minWidth: 100 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortCriteria}
                        label="Sort by:"
                        onChange={handleSort}
                        >
                            {sort.map(criterion =>
                                <MenuItem key={criterion} value={criterion}>{criterion}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Box>
                <br />
            </div>
            <div className="Filter">
                <strong >Filter by categories:</strong>
                <FormGroup className="filter-list">
                    {categories.map(category =>
                        <FormControlLabel key={category} control={<Checkbox value={category} />} label={category} onChange={eventCategory} />
                    )}
                </FormGroup>
                <br/>
            </div>
            <div className="Filter">
                <strong >Filter by brands:</strong>
                <FormGroup className="filter-list">
                    {brands.map(brand =>
                        <FormControlLabel key={brand} control={<Checkbox value={brand} />} label={brand} onChange={eventBrand} />
                    )}
                </FormGroup>
                <br/>
            </div>
        </div>
    )
}
