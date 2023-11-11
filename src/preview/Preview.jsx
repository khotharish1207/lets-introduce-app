import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { getHref, hasLightBG, stripAttr, saveContact } from "../utils";

const Preview = () => {
  const {
    images,
    pageDesign,
    contactInformation,
    actionItems: { primaryActions, secondaryActions },
    feature,
  } = useSelector((state) => state);

  console.log({ primaryActions });

  const [hasOnlyProfilePic, setHasOnlyProfilePic] = useState(false);

  useEffect(() => {
    setHasOnlyProfilePic(!(images?.cover?.url || images?.logo?.url));
  }, [images]);

  const getFullName = () => {
    const { fname: fn, lname: ln } = contactInformation;
    return (fn + ln).length ? `${fn ? fn : ""}${ln ? " " + ln : ""}` : null;
  };

  const downloadVcard = () => {
    const vCard = primaryActions.reduce((acc, obj) => {
      acc[obj?.name?.toLowerCase()] = obj?.value || "";
      return acc;
    }, {});

    console.log(vCard);

    saveContact({
      contactInformation,
      vCard,
      fullName: getFullName(),
    });
  };

  const sharingPage = () => {
    const title = `Let's Introduce ${getFullName()}`;
    const text = title;
    const url = window.location.href;

    if (navigator.share !== undefined) {
      navigator
        .share({
          title,
          text,
          url,
        })
        .then(() => console.log("Shared!"))
        .catch((err) => console.error(err));
    } else {
      window.location = `mailto:?subject=${title}&body=${text}%0A${url}`;
    }
  };

  return (
    <div
      lang="en"
      style={{
        backgroundColor: pageDesign.logoBg,
        color: hasLightBG(pageDesign.mainBg) ? "#222" : "#eee",
      }}
    >
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="author" content="Let's Introduce" />
        {/* <meta name="url" content="https://enbizcard.vishnuraghav.com/" /> */}
        <meta name="designer" content="Let's Introduce" />
        <meta
          property="og:title"
          content={`Let's Introduce ${getFullName()}`}
        />
        <meta
          property="twitter:title"
          content={`Let's Introduce ${getFullName()}`}
        />
        <title>{`Let's Introduce ${getFullName()}`}</title>
      </Helmet>

      <header className="mx-auto md:w-4/6 lg:w-3/6 shadow-xl">
        <div className="headerImgC">
          {images?.cover?.url && (
            <img id="cover" src={images.cover.url} alt="Background Pattern" />
          )}

          {images?.logo?.url && (
            <img
              id="logo"
              src={images.logo.url}
              style={{
                margin: images?.photo?.url
                  ? images.cover.url
                    ? "3rem 0 6rem"
                    : "3rem 0 8rem"
                  : "3rem 0",
              }}
              alt="Logo"
            />
          )}
        </div>
      </header>
      <main
        style={{
          backgroundColor: `${pageDesign.mainBg}`,
          marginTop: hasOnlyProfilePic ? "5rem" : "0",
        }}
        className="mx-auto md:w-4/6 lg:w-3/6 shadow-xl"
      >
        {images?.photo?.url && (
          <img
            id="profilePhoto"
            v-if="images.photo.url"
            src={images.photo.url}
            alt="profilePhoto"
          />
        )}

        <div id="info" className="textColor">
          <p className="name">{getFullName()}</p>
          {contactInformation?.pronouns && (
            <p className="pronouns">({contactInformation.pronouns})</p>
          )}
          <p className="jobtitle">{contactInformation?.title}</p>
          <p className="bizname">{contactInformation?.biz}</p>
          {contactInformation?.addr && (
            <p className="bizaddr">{contactInformation.addr}</p>
          )}
        </div>
        {contactInformation?.desc && (
          <p className="sub textColor" v-if="genInfo.desc">
            {contactInformation.desc}
          </p>
        )}

        <div className="flex items-center w-4/5 mt-8">
          <button
            id="cta"
            style={{ backgroundColor: pageDesign?.buttonBg }}
            onClick={downloadVcard}
            aria-label="Save Contact"
          >
            <div className="icon iconColor">
              <img
                alt="Save Contact"
                src={require("../assets/icons/add-user.svg?include").default}
              />
            </div>
            <p className="iconColor">Save Contact</p>
          </button>
          <div className="actionBtn">
            <a
              // href={getHref(actionItem)}
              onClick={sharingPage}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: pageDesign.buttonBg,
              }}
              aria-label="share"
            >
              <div className="icon iconColor">
                <img
                  alt="share"
                  src={require(`../assets/icons/share.svg?include`).default}
                />
              </div>
            </a>
          </div>
        </div>

        <div className="actions">
          {primaryActions.map((actionItem, index) => (
            <div className="actionsC" key={`pa-${index}`}>
              <div className="actionBtn">
                <a
                  href={getHref(actionItem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: pageDesign.buttonBg,
                  }}
                  aria-label={actionItem.name}
                >
                  <div className="icon iconColor">
                    <img
                      alt={actionItem.name}
                      src={require(`../assets/icons/${actionItem.icon}.svg?include`)}
                    />
                  </div>
                </a>
                <p className="textColor">
                  {actionItem.name.substr(0, 1).toUpperCase() +
                    actionItem.name.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="actions secondary">
          {secondaryActions.map((actionItem, index) => (
            <div className="actionsC" key={`sa-${index}`}>
              <div className="actionBtn secBtn">
                <a
                  href={getHref(actionItem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: actionItem.color }}
                  aria-label={actionItem.name}
                >
                  <div className="icon" v-html="getSVG(item)">
                    <img
                      alt={actionItem.name}
                      src={require(`../assets/icons/${actionItem.icon}.svg?include`)}
                    />
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>

        {feature.map(({ title, content }, idx) => {
          return (
            <div key={`featured-${idx}-${title}`} className="featured">
              <h2 className="section textColor" v-if="item.title">
                {title}
              </h2>

              <div style={{ backgroundColor: pageDesign.cardBg }}>
                {content.map((ctnt, i) => {
                  if (ctnt.contentType === "media") {
                    return (
                      <div key={`featured-${idx}-content-${i}`}>
                        <div
                          className={`media ${ctnt.type}`}
                          style={{ backgroundColor: pageDesign.cardBg }}
                        >
                          {ctnt.type === "image" && (
                            <div>
                              <img src={ctnt?.dataURI} alt="media" />
                              <div className="controls cardColor">
                                <p className="title">{ctnt.title}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }

                  if (ctnt.contentType === "text" && ctnt.value) {
                    return (
                      <div key={`featured-${idx}-content-${i}`}>
                        <div
                          className={`media ${ctnt.type}`}
                          style={{ backgroundColor: pageDesign.cardBg }}
                        >
                          <p className="textC cardColor">{ctnt.value}</p>
                        </div>
                      </div>
                    );
                  }

                  const embed = stripAttr(ctnt);
                  if (embed) {
                    return (
                      <div
                        className="media embedded"
                        style={{ backgroundColor: pageDesign.cardBg }}
                      >
                        <iframe
                          title="media embedded"
                          src={embed}
                          frameborder="0"
                          allowfullscreen
                        ></iframe>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          );
        })}
      </main>
      <footer class="mx-4 flex flex-col mx-auto md:w-4/6 lg:w-3/6 shadow-xl">
        <div class="flex flex-col justify-center items-center">
          <p class="mb-2 text-center">Made with ❤️ by</p>
          <p class="font-extrabold text-xl mt-2 leading-tight">
            <a
              href={window.location.host}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                className="w-6 h-6 mr-2 shrink-0 inline-block"
                alt={"app logo"}
                src={require(`../assets/icons/app-logo.svg?include`).default}
              />
              Let's Introduce
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Preview;
