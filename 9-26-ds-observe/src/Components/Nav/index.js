import { Link } from "react-router-dom";
import { Card, Divider, Flex, View } from "@aws-amplify/ui-react";
import Banner from "../Banner";

const Nav = () => {
  return (
    <View position={"sticky"} top={0}>
      <Banner />
      <Card width={"100%"} variation={"elevated"}>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex alignItems="center" justifyContent="center">
            <Link to="/">Todos</Link>
            <Divider orientation="vertical" />
            <Link to="/belongs-to">Belongs To</Link>
          </Flex>
          <Divider orientation="vertical" />
        </Flex>
      </Card>
    </View>
  );
};

export default Nav;
