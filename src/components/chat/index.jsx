import React from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  POST_MESSAGE,
  GET_ALL_QUOTES,
  SIGNUP_USER,
  LOGIN_USER,
  GET_USER_BY_ID,
  REGISTER_USER,
  DELETE_POST_MUTATION,
  UPDATE_USER,
} from "./../../services/home-page/index";
import Messages from "./../message/index";
import { Container, Row, Col, FormInput, Button } from "shards-react";

const Chat = () => {
  const [state, stateSet] = React.useState({
    user: "Jack",
    content: "",
  });
  // getAll
  //const {loading, error, data} = useQuery(GET_ALL_QUOTES)
  // if(loading) return <h1>Loading</h1>
  // if(error) {
  //   console.log(error?.message || "");
  // }
  // if(data.quotes.length === 0) {
  //   return <h2>No Quotes Available</h2>
  // }
  // getById -> thường dùng cho trang detail -> thông thường update, delete, getById thì thường tách ra 1 component riêng để truyền props vào, ở component con ms bỏ hàm này vào thì lúc này đã có sẵn userid rồi
  // const [getById, {loading, error, data}] = useQuery(GET_USER_BY_ID, {
  // nếu không muốn check status của api này thông qua biến data ở trên thì cũng có thể dùng hàm này để check
  //  update() {
  // success sẽ vào đây, ở đây có thể đẩy lên localStorage or đẩy qua page khác
  //    }
  //   variables: {
  //     userid: userid // -> userid này là props
  //   }
  // })
  // post
  // khi post xong để cập nhật data mới nhất thì useMutation của có support điều này = cách gọi getAll lại
  //const [createQuote, {loading, error, data}] = useMutation(CREATE_QUOTE, {
  // refetchQueries: [
  //   GET_ALL_QUOTES,
  //   "getAllQuotes"
  // ]
  // cần refetch nhiều hơn 1 data thì dùng cách này
  // refetchQueries: [
  //   "getAllQuotes",
  //   "getMyProfile"
  // ]
  //})
  // check status cách 2 của api post
  // const [signinUser] = useMutation(LOGIN_USER, {
  //   //login thành công thì đẩy accessToken lên localStorage và đẩy sang page nào đó = router
  //   onCompleted(data) {
  //     localStorage.setItem("token", data?.user?.token)
  //   }
  // })
  // check status cách 3 của api post
  // const [errors, setErrors] = useState("");
  // const [addUser, { loading }] = useMutation(REGISTER_USER, {
  //   // hoặc dùng hàm này để check post thành công, ngoài ra hàm này cũng giống dòng 39 khi post xong để update lại data mới thì dùng cách này
  //   variables: obj,
  //   update(proxy, result) {
  //     console.log(result);
  //     // khi post thành công sẽ vào đây, ở đây sẽ xử lý đưa data lên localStorage or đẩy qua page nào đó = router
  //     const data = proxy.readQuery({
  //       query: GET_ALL_USER,
  //     });
  //     data.getPosts = [result.data.createPost, ...data.getPosts]; // khúc này là post (add) nên thêm 1 object và mảng hiện tại
  //     proxy.writeQuery({ query: GET_ALL_USER, data });
  //     obj = "";
  //   },
  //   onError(err) {
  //     setErrors(err.graphQLErrors[0].extensions.exception.errors);
  //   },
  // });
  // delete
  // const [deletePost] = useMutation(DELETE_POST_MUTATION, {
  //   // update này là gì ở trên có chú thích rồi
  //   update(proxy) {
  //     const data = proxy.readQuery({
  //       query: GET_ALL_POST
  //     });
  // postId này là props -> thao tác update, delete, add phải tách ra 1 component riêng và component con này luôn có 1 props
  //     data.getPosts = data.getPosts.filter((p) => p.id !== postId); // khúc này là post (delete) nên lọc theo id bỏ 1 obj ra
  //     proxy.writeQuery({query: GET_ALL_POST, data})
  //   }
  // })
  // update
  // const [updateUser] = useMutation(UPDATE_USER, {
  //   update() {

  //   },
  //   variables: {
  //     userId,
  //     obj: obj
  //   }
  // })
  // search -> thường sử dụng useLazyQuery cho chức năng search
  // const [nameQuery, setNameQuery] = useState("");
  // const [getProduct, {data, loading, error}] = useLazyQuery(GET_PRODUCT_BY_NAME, {
  //   variables: {
  //     "filters": {
  //       "name": {
  //         "startsWith": nameQuery
  //       }
  //     }
  //   }
  // })
  //========================
  // check status cách 1 của api post
  const [postMessage, { data: dataMain, loading, error }] =
    useMutation(POST_MESSAGE);
  if (loading) return <h1>Loading</h1>;
  if (error) {
    console.log(error?.message || "");
  }
  if (dataMain) {
    console.log(dataMain);
  }
  // const [signupUser] = useMutation(SIGNUP_USER);
  const onSend = () => {
    if (state.content.length > 0) {
      postMessage({
        variables: state,
      });
      // signupUser({
      //   variables: {
      //     userNew: obj
      //   }
      // })
      // signinUser({
      //   variables: {
      //     userSignin: obj
      //   }
      // })
      // createQuote({
      //   variables: {
      //     name: quote
      //   }
      // })
      //addUser()
      //getById()
      //updateUser()
      // vì đây là chức năng search product theo name nên bỏ vào onChange Input (để tạm ở onClick :))))
      //getProduct()
    }
    stateSet({
      ...state,
      content: "",
    });
  };
  return (
    <Container>
      {/* {
        data?.quotes.map((v) => {
          return (
            <div></div>
          )
        })
      } */}
      <Messages user={state.user} />
      <Row>
        <Col xs={2} style={{ padding: 0 }}>
          <FormInput
            label="User"
            value={state.user}
            onChange={(evt) =>
              stateSet({
                ...state,
                user: evt.target.value,
              })
            }
          />
        </Col>
        <Col xs={8}>
          <FormInput
            label="Content"
            value={state.content}
            onChange={(evt) =>
              stateSet({
                ...state,
                content: evt.target.value,
              })
            }
            onKeyUp={(evt) => {
              if (evt.keyCode === 13) {
                onSend();
              }
            }}
          />
        </Col>
        <Col xs={2} style={{ padding: 0 }}>
          <Button onClick={() => onSend()} style={{ width: "100%" }}>
            Send
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
