#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod loybit_manager {
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;
    use ink::storage::Mapping;
    use ink::storage::StorageVec;

    #[ink(event)]
    pub struct Payment {
        user: AccountId,
        acquirer: AccountId,
        tokens_received: u32
    }

    #[ink(event)]
    pub struct NewUser {
        user: AccountId
    }

    #[ink(event)]
    pub struct NewAcquirer {
        acquirer: AccountId,
        tokens_available: u32,
    }

    #[ink(event)]
    pub struct NewReward {
        acquirer: AccountId,
        cost: u32,
        name: String
    }

    #[ink(event)]
    pub struct Claim {
        user: AccountId,
        acquirer: AccountId,
        tokens_cashed: u32
    }

    #[ink::scale_derive(Encode, Decode, TypeInfo)]
    #[cfg_attr(
        feature = "std",
        derive(ink::storage::traits::StorageLayout)
    )]
    #[derive(Clone)]
    pub struct Reward {
        acquirer: AccountId,
        title: String,
        category: String,
        cost: u32
    }

    #[ink(storage)]
    pub struct LoybitsManager {
        user_balances: Mapping<AccountId, u32>,
        acquirer_balances: Mapping<AccountId, u32>,
        rewards: Mapping<String, Reward>,
        reward_titles: StorageVec<String>
    }

    impl LoybitsManager {
        // Creates a new manager
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                user_balances: Mapping::default(),
                acquirer_balances: Mapping::default(),
                rewards: Mapping::default(),
                reward_titles: Default::default()
            }
        }


        /// Returns the current balance of user.
        #[ink(message)]
        pub fn get_balance_user(&self) -> Option<u32> {
            let caller = self.env().caller();
            self.user_balances.get(caller)
        }

        /// Returns the current balance of acquirer.
        #[ink(message)]
        pub fn get_balance_acquirer(&self) -> Option<u32> {
            let caller = self.env().caller();
            self.acquirer_balances.get(caller)
        }

        #[ink(message)]
        pub fn getRewards(&self) -> Vec<Reward> {
            let mut rewards = Vec::new();
            for i in 0..self.reward_titles.len(){
                rewards.push(self.rewards.get(self.reward_titles.get(i).expect("Unexpected rewards length").clone()).expect("Unexpected reward title"))
            }
            rewards
        }

        /// Creates new user
        #[ink(message)]
        pub fn add_user(&mut self) {
            let caller = self.env().caller();
            self.user_balances.insert(caller, &0);

            self.env().emit_event(NewUser {
                user: caller
            });
        }

        /// Creates new acquirer
        #[ink(message)]
        pub fn add_acquirer(&mut self, tokens: u32) {
            let caller = self.env().caller();
            self.acquirer_balances.insert(caller, &tokens);

            self.env().emit_event(NewAcquirer {
                acquirer: caller,
                tokens_available: tokens
            });
        }

        /// Adds new reward of acquirer
        #[ink(message)]
        pub fn add_reward(&mut self, tokens: u32, name: String, category: String) {
            let caller = self.env().caller();
            assert!(self.acquirer_balances.contains(caller), "Caller must be an acquirer");
            self.reward_titles.push(&name.clone());
            self.rewards.insert(name.clone(), {&Reward {
                acquirer: caller,
                title: name.clone(),
                cost: tokens,
                category: category.clone()
            }});

            self.env().emit_event(NewReward {
                acquirer: caller,
                cost: tokens,
                name: name.clone()
            });
        }

        /// Register a payment to give tokens to user
        #[ink(message)]
        pub fn register_payment(&mut self, tokens: u32, user: AccountId) {
            let caller = self.env().caller();
            assert!(self.acquirer_balances.contains(caller), "Caller must be an acquirer");
            assert!(self.user_balances.contains(user), "User must be registered");
            let user_current_balance = self.user_balances.get(user).unwrap_or(0);
            let acquirer_current_balance = self.acquirer_balances.get(caller).unwrap_or(0);

            assert!(acquirer_current_balance >= tokens, "Insufficient Loybits!");

            self.user_balances.insert(user, &(user_current_balance.wrapping_add(tokens)));
            self.acquirer_balances.insert(caller, &(acquirer_current_balance.wrapping_sub(tokens)));

            self.env().emit_event(Payment {
                user,
                acquirer: caller,
                tokens_received: tokens
            });
        }

        /// Register a claim of a reward by user
        #[ink(message)]
        pub fn register_claim(&mut self, reward: String) {
            let caller = self.env().caller();

            assert!(self.user_balances.contains(caller), "Caller must be a user");
            assert!(self.rewards.contains(&reward), "Reward must be registered");

            let reward = self.rewards.get(reward);
            let tokens = reward.clone().unwrap().cost;
            let acquirer = reward.clone().unwrap().acquirer;
            let user_current_balance = self.user_balances.get(caller).unwrap_or(0);
            let acquirer_current_balance = self.acquirer_balances.get(acquirer).unwrap_or(0);

            assert!(user_current_balance >= tokens, "Insufficient Loybits!");

            self.user_balances.insert(caller, &(user_current_balance.wrapping_sub(tokens)));
            self.acquirer_balances.insert(acquirer, &(acquirer_current_balance.wrapping_add(tokens)));

            self.env().emit_event(Claim {
                user: caller,
                acquirer,
                tokens_cashed: tokens
            });
        }
    }
}
