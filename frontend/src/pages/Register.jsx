import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Center,
  Text,
  Stack,
  Container,
} from "@chakra-ui/react";
import { useState } from "react";
import { register } from "../modules/fetch/auth";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await register({ username, email, password });

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have successfully registered an account.",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Oops! Something went wrong during registration.",
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  };

  return (
    <Container
      borderRadius="4%"
      boxShadow="xl"
      w="350px"
      px="30px"
      pt="30px"
      pb="25px"
      my="40px"
    >
      <Stack>
        <Text
          bgGradient="linear(to-l, black, blue.400)"
          bgClip="text"
          fontFamily="sans-serif"
          fontSize="3xl"
          fontWeight="bold"
          textAlign="center"
        >
          Register
        </Text>
        <FormControl>
          <Stack>
            <FormLabel mb={0}>Username</FormLabel>
            <Input type="text" onChange={(e) => setUsername(e.target.value)} />
            <FormLabel mt={2} mb={0}>
              Email
            </FormLabel>
            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            <FormLabel mt={2} mb={0}>
              Password
            </FormLabel>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Stack>
          <Center>
            <Button
              bgGradient="linear(to-l, black, blue.500)"
              boxShadow="sm"
              color="white"
              w="80px"
              mt={3}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Center>
          <Text fontWeight="medium" align="center" pt="20px">
            Already have an account? <Link to="/login">Sign In</Link>
          </Text>
        </FormControl>
      </Stack>
    </Container>
  );
}

export default Register;
