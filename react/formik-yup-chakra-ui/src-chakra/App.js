import { Formik, Field, Form } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
function App() {
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={64}>
        <h1>Sign Up</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
          }}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <Form>
            <FormControl>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Field
                as={Input}
                id="firstName"
                name="firstName"
                placeholder="Jane"
                variant="filled"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Field
                as={Input}
                id="lastName"
                name="lastName"
                placeholder="Doe"
                variant="filled"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Field
                as={Input}
                id="email"
                name="email"
                placeholder="jane@acme.com"
                type="email"
                variant="filled"
              />
            </FormControl>
            <br />
            <Button type="submit" colorScheme="purple" width="full">
              Submit
            </Button>
          </Form>
        </Formik>
      </Box>
    </Flex>
  );
}

export default App;
