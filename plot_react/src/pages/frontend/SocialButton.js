import { chakra, useColorModeValue, VisuallyHidden } from '@chakra-ui/react';
import React from 'react'

const SocialButton = ({children,label,href}) => {
    return (
      <chakra.button
        bg={useColorModeValue( 'white')}
        rounded={'full'}
        w={66}
        h={66}
        cursor={'pointer'}
        as={'a'}
        href={href}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'background 0.3s ease'}
        _hover={{
          bg: useColorModeValue('#2b2d42', 'whiteAlpha.200'),
        }}>
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    );
  };

export default SocialButton