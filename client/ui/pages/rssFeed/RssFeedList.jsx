import React, {useEffect, useState} from 'react';
import {Table} from 'flowbite-react';
import {rssFeedFetch} from '../../../../imports/modules/rss/rss.methods';
import {ToastSuccess, ToastWarning} from '../../components/alert/Toast';
import {H2} from "../../components/heading/Headings";
import Skeleton from "react-loading-skeleton";

export const RssFeedList = () => {
  const [rssItems, setRssItems] = useState(null);
  const [error, setError] = useState(null);
  const url = Meteor.settings.public.rssUrl;

  useEffect(() => {
    const fetchRSSFeed = async () => {
      try {
        const response = await rssFeedFetch({ url }); // Changed to use await rssFeedFetch
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response, 'text/xml');

        const items = Array.from(xmlDoc.getElementsByTagName('item'));
        const parsedItems = items.map(item => ({
          title: item.getElementsByTagName('title')[0].textContent,
          link: item.getElementsByTagName('link')[0].textContent,
          pubDate: item.getElementsByTagName('pubDate')[0].textContent,
          description: item.getElementsByTagName('description')[0]?.textContent,
        }));

        setRssItems(parsedItems);
        ToastSuccess('RSS Feed loaded successfully');
      } catch (err) {
        setError('Failed to fetch RSS feed');
        console.error(err);
        ToastWarning('RSS Feed failed to load');
      }
    };

    fetchRSSFeed();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!rssItems) {
    return (
      <Skeleton count={3} />
    )
  }

  return (
    <>
      <div className="sm:flex sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center">
            <H2 text="RSS Feed"/>
          </div>
        </div>
      </div>
      <div className="mt-2 w-full text-gray-500 text-lg">
        <Table striped hoverable className="w-full">
          <Table.Body>
            {rssItems.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    <h2 className="font-bold text-xl text-blue-600">{item.title}</h2>
                  </a>
                  <p className="text-gray-600">{new Date(item.pubDate).toLocaleDateString()}</p>
                  <p>{item.description || 'No description available.'}</p>
                </Table.Cell>
                <Table.Cell>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Read more
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};
