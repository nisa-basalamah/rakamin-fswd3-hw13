import { useEffect, useState } from "react";
import { deleteBook, getAllBooks } from "../modules/fetch/books";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Spinner,
  Stack,
  Image,
  Button,
  Center,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      // client-side rendering
      // load the page first, then retrieve the data
      const response = await getAllBooks();

      setBooks(response.books);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);

      Swal.fire({
        icon: "success",
        title: "Book Deleted Successfully",
        text: "The selected book has been removed from the catalog.",
        showConfirmButton: false,
        timer: 2000,
      });

      fetchBooks();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Delete Book",
        text: "Oops! Something went wrong while deleting the selected book.",
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchBooks();

    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  if (loading) {
    return (
      <>
        <Stack direction="row">
          <Text fontSize="2xl">Loading...</Text>
          <Spinner size="lg" />
        </Stack>
      </>
    );
  }

  return (
    <>
      <TableContainer p="20px">
        <Table variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th fontSize="15px" color="black">
                No
              </Th>
              <Th fontSize="15px" color="black">
                Title
              </Th>
              <Th fontSize="15px" color="black">
                Author
              </Th>
              <Th fontSize="15px" color="black">
                Publisher
              </Th>
              <Th fontSize="15px" color="black">
                Year
              </Th>
              <Th fontSize="15px" color="black">
                Pages
              </Th>
              <Th fontSize="15px" color="black">
                Image
              </Th>
              <Th fontSize="15px" color="black">
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {books.map((book, index) => {
              return (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{book.title}</Td>
                  <Td>{book.author}</Td>
                  <Td>{book.publisher}</Td>
                  <Td>{book.year}</Td>
                  <Td>{book.pages}</Td>
                  <Td>
                    <Image
                      boxSize="150px"
                      objectFit="contain"
                      src={`http://localhost:8000/${book.image}`}
                      fallbackSrc="https://via.placeholder.com/150"
                    />
                  </Td>
                  <Td>
                    <Stack>
                      <Button
                        color="white"
                        bgColor="gray.500"
                        onClick={() => navigate(`/books/${book.id}/edit`)}
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          isAuthenticated
                            ? handleDeleteBook(book.id)
                            : navigate("/login");
                        }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Center>
        <Button
          bgGradient="linear(to-l, black, blue.700)"
          boxShadow="sm"
          color="white"
          onClick={() => navigate("/books/create")}
          mb="100px"
        >
          Add New Book
        </Button>
      </Center>
    </>
  );
}

export default Home;
