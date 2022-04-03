import React, { useRef, useState } from 'react'
import { Box, Button, FormControl, Grid, Paper, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';

const RegisterMaterial = ({registerTable, modalClose}) => {

    const refForm = useRef(null);

    const paperStyle = {padding : '40px 20px', width : 250, margin : '20px auto'};
    const btnStyle = {marginTop : 10};

    const today = new Date().toISOString().substring(0, 10);

    const [state, setState] = useState({
        wear_date : today,
        product_num : "",
        product_name : "",
        weight : "",
        thickness : "",
        width : "",
        length : "",
        company : "",
        manager : "",
      })

      const handleChange = e => {
        setState({
          ...state,
          [e.target.name]: e.target.value,
        })
      }

    return (
        <Grid>
            <Paper elevation={5} style={paperStyle} >
                <Grid align='center'>
                    <Typography variant='h6'>단건 입력 폼</Typography>
                    <Typography variant='captain'>데이터를 입력해주세요</Typography>
                </Grid>
                <form
                    ref={refForm}
                    onSubmit={function(e) {
                        e.preventDefault();

                        try {
                          
                            registerTable(state);
                          refForm.current.reset();
                        } catch(err) {
                          console.log(err.message);
                        }
                      }}
                >
                    
                    <TextField 
                        name="wear_date" 
                        fullWidth 
                        type={"date"} 
                        value={state.wear_date}
                        onChange={handleChange}
                        autoFocus />
                    <TextField 
                        name="product_num" 
                        label='재료번호'
                        value={state.product_num}
                        onChange={handleChange} 
                        fullWidth />
                    <TextField 
                        name="product_name" 
                        label='품명' 
                        value={state.product_name}
                        onChange={handleChange} 
                        fullWidth />
                    <TextField 
                        name="weight" 
                        label='중량' 
                        value={state.weight}
                        onChange={handleChange} 
                        fullWidth />
                    <TextField 
                        name="thickness" 
                        label='두께' 
                        value={state.thickness}
                        onChange={handleChange}
                        fullWidth />
                    <TextField 
                        name="width" 
                        label='폭' 
                        value={state.width}
                        onChange={handleChange}
                        fullWidth />
                    <TextField 
                        name="length" 
                        label='길이' 
                        value={state.length}
                        onChange={handleChange}
                        fullWidth />
                    <TextField 
                        name="company" 
                        label='구매처' 
                        value={state.company}
                        onChange={handleChange}
                        fullWidth />
                    <TextField 
                        name="manager" 
                        label='구매담당자' 
                        value={state.manager}
                        onChange={handleChange}
                        fullWidth />
                    <Button 
                        type='submit' 
                        style={btnStyle} 
                        variant='contained'
                        color='primary'
                        onClick={()=>{
                            modalClose();
                        }}
                        >
                        Register
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
}

export default RegisterMaterial