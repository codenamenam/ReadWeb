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
  // 전문테 지문 가져오기
  const [readData, setReadData] = useState("");
  const handleReadData = async () => {
    const result = await axios.get("../api/getReadData");
    if (result.status === 200) {
      setReadData(result.data.body);
    }
  };

  // 동적 라우팅
  const router = useRouter();
  const [user_id, setUserId] = useState("");
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    handleReadData();

    const { user_id } = router.query;

    if (user_id && typeof user_id == "string") {
      setUserId(user_id);
      handleSummaryData(user_id);
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

  const handleSummaryData = async (user_id: string | string[]) => {
    const result = await axios.get("../api/getSummaryData/" + user_id);
    if (result.status === 200 && result.data.body != null) {
      setIsSubmitted(true);
      setSummaryData(result.data.body[0]["summary"]);
      setUserName(result.data.body[0]["user_name"]);
    }
  };

  // 요약 제출 기능
  const submit = async () => {
    console.log(sessionStorage.getItem("inputData"));
    if (isSubmitted) {
      alert("이미 요약이 제출되었습니다. 조금만 기다려주세요.");
    } else if (sessionStorage.getItem("inputData")?.length == 0) {
      alert("요약 내용을 입력해주세요.");
    } else {
      const allData = {
        bot: {
          id: "64bb62cd84644d346efde407",
          name: "도파민 디펜스 봇",
        },
        intent: {
          id: "64c791901a44040a688c7491",
          name: "요약하기",
          extra: {
            reason: {
              code: 0,
              message: "OK",
            },
          },
        },
        action: {
          id: "64e439e08c33dd465729751d",
          name: "post-submit-summary",
          params: {
            summary: "",
          },
          detailParams: {
            summary: {
              groupName: "",
              origin: inputValue,
              value: "",
            },
          },
        },
        clientExtra: {},
        userRequest: {
          block: {
            id: "64c791901a44040a688c7491",
            name: "요약하기",
          },
          user: {
            id: "4025ce2f5726e5b4e585f3d172c1fe97156ba4ae381ab1b756583e9fbf8982a22f",
            type: "botUserKey",
            properties: {
              botUserKey:
                "4025ce2f5726e5b4e585f3d172c1fe97156ba4ae381ab1b756583e9fbf8982a22f",
              appUserStatus: "REGISTERED",
              isFriend: true,
              app_user_status: "REGISTERED",
              app_user_id: user_id,
              plusfriendUserKey: "ckUy2724egt1",
              appUserId: user_id,
              bot_user_key:
                "4025ce2f5726e5b4e585f3d172c1fe97156ba4ae381ab1b756583e9fbf8982a22f",
              plusfriend_user_key: "ckUy2724egt1",
            },
          },
          utterance: "요약하기",
          params: {
            surface: "Kakaotalk.plusfriend",
          },
          lang: "ko",
          timezone: "Asia/Seoul",
        },
        contexts: [],
      };

      const result = await axios.post("../api/postSubmitData", allData);
      alert("요약이 제출되었습니다. 잠시 후 채점 결과를 알려드릴께요!");
      setInputValue("");
      sessionStorage.setItem("inputData", "");
      setInputValueLength(0);
    }
  };

  return (
    <>
      <Center
        style={{
          backgroundImage: "url('/web-background.png')",
        }}
      >
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
            <Text style={{ fontSize: "15.5px" }}>{readData}</Text>
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
