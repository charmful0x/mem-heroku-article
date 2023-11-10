async function interact() {
  try {
    const get = [
      {
        input: {
          function: "get_quotes",
        },
      },
    ];

    const del = [
      {
        input: {
          function: "del_quote",
          index: 5,
        },
      },
    ];

    const put = [
      {
        input: {
          function: "put_quote",
          quote: ["Smart contracts but smarter", "MEM"],
        },
      },
    ];

    const functionId = "gUvZDndpoP0toXHT1Vf8w_1omAdJvQIK30YqFQj134c";
    const req = await axios.post(
      "https://api.mem.tech/api/transactions",
      {
        functionId: functionId,
        inputs: get, // OR put or del
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    console.log(JSON.stringify(req?.data, null, 4));
    return req?.data;
  } catch (error) {
    console.log(error);
  }
}