// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FreelanceMarketplace {
    struct Job {
        address client;
        string description;
        uint256 budget;
        bool active;
    }

    struct Bid {
        address freelancer;
        uint256 amount;
        bool accepted;
    }

    struct Order {
        address client;
        address freelancer;
        uint256 amount;
        bool completed;
        bool paid;
    }

    uint256 public jobCount;
    uint256 public bidCount;
    uint256 public orderCount;

    mapping(uint256 => Job) public jobs; // jobId to job details
    mapping(uint256 => Bid) public bids; // bidId to bid details
    mapping(uint256 => Order) public orders; // orderId to order details

    event JobPosted(
        uint256 jobId,
        address client,
        string description,
        uint256 budget
    );

    event BidPlaced(
        uint256 bidId,
        uint256 jobId,
        address freelancer,
        uint256 amount
    );
    event BidAccepted(uint256 orderId, uint256 jobId, uint256 bidId);
    event JobCompleted(uint256 orderId);
    event PaymentReleased(uint256 orderId, uint256 amount);

    // Client posts a job
    function postJob(
        string memory description,
        uint256 budget
    ) external payable {
        require(
            msg.value >= budget,
            "You need to send the exact budget in ETH!"
        );

        jobs[jobCount] = Job({
            client: msg.sender,
            description: description,
            budget: budget,
            active: true
        });

        emit JobPosted(jobCount, msg.sender, description, budget);
        jobCount++;
    }

    // Freelancer places a bid on a job
    function placeBid(uint256 jobId, uint256 amount) external jobExists(jobId) {
        require(jobs[jobId].active, "Job is not active");

        bids[bidCount] = Bid({
            freelancer: msg.sender,
            amount: amount,
            accepted: false
        });

        emit BidPlaced(bidCount, jobId, msg.sender, amount);
        bidCount++;
    }

    function directPlaceOrder(uint256 jobId, uint256 amount) external payable {
        Job storage job = jobs[jobId];
        require(job.active, "Job is not active");

        orders[orderCount] = Order({
            client: job.client,
            freelancer: msg.sender,
            amount: amount,
            completed: false,
            paid: false
        });

        job.active = false;
        emit JobCompleted(orderCount);
        orderCount++;
    }

    // Client accepts a bid
    function acceptBid(
        uint256 jobId,
        uint256 bidId
    ) external jobExists(jobId) bidExists(bidId) onlyJobClient(jobId) {
        Job storage job = jobs[jobId];
        Bid storage bid = bids[bidId];

        require(job.active, "Job is not active");
        require(!bid.accepted, "Bid already accepted");

        bid.accepted = true;
        job.active = false;

        orders[orderCount] = Order({
            client: job.client,
            freelancer: bid.freelancer,
            amount: bid.amount,
            completed: false,
            paid: false
        });

        emit BidAccepted(orderCount, jobId, bidId);
        orderCount++;
    }

    function completeJob(
        uint256 orderId
    ) external orderExists(orderId) onlyFreelancer(orderId) {
        Order storage order = orders[orderId];
        require(!order.completed, "Order already completed");

        order.completed = true;
        emit JobCompleted(orderId);
    }

    function releasePayment(
        uint256 orderId
    ) external orderExists(orderId) onlyOrderClient(orderId) {
        Order storage order = orders[orderId];
        require(order.completed, "Job is not completed");
        require(!order.paid, "Payment already released");
        order.paid = true;
        (bool callSuccess, ) = payable(msg.sender).call{value: order.amount}( // solhint-disable-line avoid-low-level-calls // solhint-disable-line reentrancy
            ""
        );
        require(callSuccess, "Call failed");
        emit PaymentReleased(orderId, order.amount);
    }

    modifier jobExists(uint256 jobId) {
        require(jobId < jobCount, "Job does not exist");
        _;
    }

    modifier bidExists(uint256 bidId) {
        require(bidId < bidCount, "Bid does not exist");
        _;
    }

    modifier orderExists(uint256 orderId) {
        require(orderId < orderCount, "Order does not exist");
        _;
    }

    modifier onlyJobClient(uint256 jobId) {
        require(
            msg.sender == jobs[jobId].client,
            "Only the job client can perform this action"
        );
        _;
    }

    modifier onlyFreelancer(uint256 orderId) {
        require(
            msg.sender == orders[orderId].freelancer,
            "Only the freelancer can perform this action"
        );
        _;
    }

    modifier onlyOrderClient(uint256 orderId) {
        require(
            msg.sender == orders[orderId].client,
            "Only the order client can perform this action"
        );
        _;
    }
}
