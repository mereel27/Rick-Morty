
module.exports.handler = async (event) => {
  try {
    const { token } = event.queryStringParameters;
    const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?token=${token}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    const jsonData = await response.json();
    return {
      ok: response.ok,
      statusCode: response.status,
      body: JSON.stringify(jsonData),
    }
  } catch (err) {
    console.log(err)
    return {
      ok: false,
      statusCode: err.status || 404,
      body: JSON.stringify(err),
    }
  }
}