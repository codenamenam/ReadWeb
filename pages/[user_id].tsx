import { Button, Center, Flex, Text, Title, Textarea } from "@mantine/core";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Gowun_Batang, Noto_Sans_KR } from "next/font/google";

const gowun = Gowun_Batang({ subsets: ["latin"], weight: "400" });
const noto = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  // 전문테 지문 가져오기 - 하드코딩
  // const [readData, setReadData] = useState("");
  // const handleReadData = async () => {
  //   const result = await axios.get("../api/getReadData");
  //   if (result.status === 200) {
  //     setReadData(result.data.body);
  //   }
  // };

  // 동적 라우팅
  const router = useRouter();
  const [user_id, setUserId] = useState("");
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    // handleReadData();

    const { user_id } = router.query;

    if (user_id && typeof user_id == "string") {
      setUserId(user_id);
      //handleSummaryData(user_id);
    }
  }, [router.isReady]);

  // 텍스트 입력
  const [inputValue, setInputValue] = useState("");
  const [inputValueLength, setInputValueLength] = useState(0);

  // 요약 제출 확인 - 작업중
  /**
   * 사용자가 요약을 제출했다면 1주일 뒤에 다시 사용할 수 있음.
   * 애러코드: 400
   * message: already exists
   * description: Try again next Monday
   */
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [summaryData, setSummaryData] = useState("");
  const [userName, setUserName] = useState("");

  // const handleSummaryData = async (user_id: string | string[]) => {
  //   const result = await axios.get("../api/getSummaryData/" + user_id);
  //   if (result.status === 200 && result.data.body != null) {
  //     setIsSubmitted(true);
  //     setSummaryData(result.data.body[0]["summary"]);
  //     setUserName(result.data.body[0]["user_name"]);
  //   }
  // };

  // 요약 제출 기능
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const submit = async () => {
    if (isSubmitted) {
      alert("이미 요약이 제출되었습니다. 조금만 기다려주세요.");
    } else if (!sessionStorage.getItem("inputData")) {
      alert("요약 내용을 입력해주세요.");
    } else {
      setIsSubmitted(true);

      const allData = {
        summary: sessionStorage.getItem("inputData"),
        bot_user_key: user_id,
      };

      setButtonDisabled(true);

      if (inputValueLength > 200) {
        alert("요약이 너무 길어요! 200자 이내로 요약을 해주세요.");
        setIsSubmitted(false);
        setButtonDisabled(false);
        return;
      }
      const result = await axios.post("../api/postSubmitData", allData);
      try {
        if (result.status === 200) {
          if (result.data == 200) {
            alert("요약이 제출되었습니다. 잠시 뒤 결과를 알려드릴께요!");
            setInputValue("");
            sessionStorage.setItem("inputData", "");
            setInputValueLength(0);
          } else if (result.data == 400) {
            alert("이미 참여하셨습니다! 다음주 월요일에 또 참여해주세요!");
          } else if (result.data == 401) {
            alert("당신은 누구..?");
          } else {
            setButtonDisabled(true);
            alert("오류가 발생하였습니다.");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Center>
        <Flex
          direction={"column"}
          align={"center"}
          style={{ width: "340px", marginTop: "20px" }}
          className={noto.className}
        >
          <Text
            style={{
              color: "grey",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            2023학년도
          </Text>

          <Text
            style={{
              marginBottom: "20px",
              fontSize: "25px",
              fontWeight: "700",
            }}
          >
            전국 문해력 테스트 국어영역
          </Text>

          <div
            className={gowun.className}
            style={{
              backgroundColor: " rgba(255, 255, 255, 1)",
              padding: "10px",
              marginBottom: isSubmitted ? "50px" : "130px",
              borderRadius: "7px",
            }}
          >
            <Text style={{ fontSize: "15.5px" }}>
              현대 그리스 철학자 벨라비스타의 이론에 따르면 우리는 누구나 두
              개의 서로 다른 성향에 의해 지배되고 있는데, 첫 번째는 사랑을
              갈구하는 성향이고 두 번째는 무슨 일이 있어도 자신의 자유를
              지키려고 하는 성향이다. 그는 교통 체증 때문에 길거리가 꽉 막혀
              있을 때에는 다른 운전자들에 대해 이유 없는 적의를 품다가도, 배를
              타고 여러 시간 넓은 바다를 지나다가 수평선 위에 나타난 다른 배를
              발견하면 반갑게 손을 흔드는 인간의 이중적 마음을 예로 들어
              설명하고 있다. 그는 이런 두 가지 유형의 인간을 사랑의 인간, 자유의
              인간이라고 정의했다. 아울러 두 개의 성향 중 어느 성향이 더 강하게
              나타나는가에 따라 사람을 분류할 수 있다고 하였다. 벨라비스타
              이론의 독창성은 사랑과 자유를 좌표축에 올려놓을 때 서로 반대되는
              힘이 아니라 수직으로 만나는 두 개의 긍정적인 축 위에 표시한다는
              점이다. 다른 말로 해서 두 가지 성향이 모두 긍정적인 성향이라는
              것이다. 예를 들어, 좌표 오른쪽의 가로축을 사랑의 축(X축)이라고
              하고 위쪽의 세로축(Y축)을 자유의 축이라고 한다면 그 사이에 있는
              모든 P점들은 인간의 성향을 나타내는 점이 된다. 바로 이 P점이
              인간이 사랑을 추구하는 성향과 자유를 추구하는 성향이 어떤 비율로
              이루어져 있는가를 나타내는 점이 된다는 것이다.
            </Text>
          </div>
        </Flex>

        <Flex
          direction={"column"}
          style={{
            position: "fixed",
            backgroundColor: "white",
            bottom: "0px",
            width: "100%",
            boxShadow: "0px 0px 0px 0px rgba(37, 38, 46, 0.15)",
            zIndex: 1000,
            borderRadius: "0px 0px 0 0",
            borderTop: "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <Flex direction={"column"} style={{ margin: "10px 20px 10px 20px" }}>
            <Flex direction="row" style={{ justifyContent: "space-between" }}>
              <Flex direction="column" style={{ width: "83%" }}>
                <Textarea
                  placeholder={"글을 읽고 200자 이내로 요약해주세요."}
                  variant="unstyled"
                  autosize
                  minRows={2}
                  maxRows={4}
                  value={inputValue}
                  onChange={(event) => {
                    setInputValue(event.currentTarget.value);
                    setInputValueLength(event.currentTarget.value.length);
                    sessionStorage.setItem(
                      "inputData",
                      event.currentTarget.value
                    );
                  }}
                />
              </Flex>

              <Flex
                direction={"column"}
                style={{ width: "14%", marginTop: "6px" }}
                align={"center"}
              >
                <Button
                  style={{
                    width: "100%",
                    height: "30px",
                    padding: "0",
                    margin: "0 0 3px 0",
                  }}
                  color="ddColorMain"
                  variant="filled"
                  radius={5}
                  onClick={submit}
                  disabled={isButtonDisabled}
                >
                  <Text style={{ fontSize: "15px", fontWeight: 700 }}>
                    제출
                  </Text>
                </Button>
                <Flex style={{ marginBottom: "15px" }}>
                  <Text style={{ color: "grey", fontSize: "12px" }}>
                    {inputValueLength}
                  </Text>
                  <Text style={{ color: "grey", fontSize: "12px" }}>/200</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </>
  );
}
