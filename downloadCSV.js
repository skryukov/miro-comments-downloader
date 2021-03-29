(() => {
  const timeout = (time) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  const openCommentsPanel = async () => {
    window.document
      .querySelector(".bottom-bar__plugin-button--COMMENTS")
      .click();
    await timeout(300);
    if (window.document.querySelector(".sidebar-comments") === null) {
      window.document
        .querySelector(".bottom-bar__plugin-button--COMMENTS")
        .click();
    }
    await timeout(300);
    window.document
      .querySelectorAll(".sidebar-comments__group-inf")
      .forEach((e) => e.click());
  };

  const commentType = (item) => {
    if (
      item.previousSibling === null ||
      item.previousSibling.className === "sidebar-comments__border"
    ) {
      return "topic";
    }

    return "message";
  };

  const parseComments = () =>
    Object.values(
      window.document.querySelectorAll(".sidebar-comment-item")
    ).map((item) => {
      const result = Object.values(item.childNodes)
        .map((e) => e.textContent)
        .filter((e) => e != "");
      result.push(commentType(item));

      return result;
    });

  const download = (data, filename, type) => {
    const link = document.createElement("a");
    link.href = `data:${type};filename=${filename};charset=utf-8,${encodeURI(
      data
    )}`;
    link.target = "_blank";
    link.download = filename;
    link.click();
  };

  const createCSV = async () => {
    await openCommentsPanel();
    const result = parseComments()
      .map((e) => e.map((el) => `"${el.replaceAll('"', '""')}"`).join(","))
      .join("\n");
    download(result, "comments.csv", "text/csv");
  };

  createCSV();
})();
