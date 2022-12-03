# My Observations on the vulnerabilities present in the ColabBank V2.

_I found out that in the deposit function there are some vulnerabilities which are highlighted below;_

- ### **Type of Deposit not specified**

  > I noticed that the type of deposit is not checked and validated to be sure that the person is depositing eth and not just anything, with this anybody can deposit trashy items and withdraw valuable eth, anything goes in this deposit function.

- ### **Current Balance can be altered because of a bug present**

  > I also noticed that the current balance can be altered and tampered with, in line 21 `balances[msg.sender] = value;` this means that the balance is equal to the latest deposit value and its not adding the latest deposit to the previous balance to get the accrued valued, with this I believe the bug will be sorted `balances[msg.sender] += value;` and save the company from a huge lose by someone who has spotted the vulnerability.

- ### **The withdraw function is buggy as it allows a person withdraw more than they deposited**
  > I realised that this function allows anyone to withdraw eth regardless of whatever the person deposited and also it allows the person to withdraw the total amount in the contract which is not proper, a person should only withdraw what he/she deposited and not more than the deposited amount made by the person.

## **THANK YOU**
