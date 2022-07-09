import logoImg from "../../assets/logo.svg";
import { Container, Content } from "./styles";

interface IHeaderProps {
  onOpenTransactionModal: () => void;
}

export function Header({ onOpenTransactionModal }: IHeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button onClick={onOpenTransactionModal} type="button">
          Nova transação
        </button>
      </Content>
    </Container>
  );
}
