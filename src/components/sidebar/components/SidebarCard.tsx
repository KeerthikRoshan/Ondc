import { Flex, useColorModeValue } from '@chakra-ui/react';
import logoWhite from 'assets/img/layout/logoWhite.png';

export default function SidebarDocs() {
	const brandColor: string = useColorModeValue('brand.500', 'white');
	const boxBg: string = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	

    return (
        <Flex
            justify='center'
            direction='column'
            align='center'
            // bg={boxBg}
            borderRadius='30px'
            me={{ base: '20px' }}
            position='relative'>

        </Flex>
    );
}
