import React from 'react';
import {ScratchCard} from 'next-scratchcard';
import {Table} from 'flowbite-react';
import {WalletIcon} from "../../../pages/wallet/WalletIcon";

const ScratchCardContent = ({shuffledNumbers, handleComplete}) => (
  <div className="scratch-card p-2">
    <span className="scratch-card-content">
      <ScratchCard
        width={150}
        height={150}
        finishPercent={70}
        brushSize={35}
        onComplete={handleComplete}
      >
        <img
          width={150}
          height={150}
          src={`https://via.placeholder.com/150x150`}
          alt="Background"
        />
        <Table className="w-full scratch-card-reward-table">
          <Table.Body>
            <Table.Row>
              <Table.Cell className="py-2 px-4">{shuffledNumbers[0]} <WalletIcon/></Table.Cell>
              <Table.Cell className="py-2 px-4">{shuffledNumbers[1]} <WalletIcon/></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="py-2 px-4">{shuffledNumbers[2]} <WalletIcon/></Table.Cell>
              <Table.Cell className="py-2 px-4">{shuffledNumbers[3]} <WalletIcon/></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="py-2 px-4">{shuffledNumbers[4]} <WalletIcon/></Table.Cell>
              <Table.Cell className="py-2 px-4">{shuffledNumbers[5]} <WalletIcon/></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </ScratchCard>
    </span>
  </div>
);

export default ScratchCardContent;
