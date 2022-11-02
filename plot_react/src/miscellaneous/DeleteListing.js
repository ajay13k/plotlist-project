import { Button, useToast } from '@chakra-ui/react'
import React from 'react'

const DeleteListing = ({children}) => {
   
  return (
    <>
     <Button>
     {children}
    </Button>
    </>
  )
}

export default DeleteListing