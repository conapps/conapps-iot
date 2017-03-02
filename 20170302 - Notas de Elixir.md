Codeschool - Try Elixir
===

Notas
---

- Functional
- Dynamic
- Compiled
- Distributed
- Erlang

- General purpose language. Best at:
	- Data Processing
	- Network Applications
	- High availability systems
- Computation is treated as a transformation of data through **functions**.

```Elixir
# Function invocation
f(x)

g(f(x), y)
```

Defining Named Functions
---

- All functions in Elixir must be part of an enclosing module

```Elixir
# Define new model
defmodule Account do
	
	# Declare a new function
	def balance(initial, spending) do
		# No retun statement. The last statement is returned.
		initial - spending
	end

end
```

OBS: No need to specify the values (dynamic)

- To invoke a function we used the *dot* notation using the module definition
where the funcion is enclosed.

```Elixir
# accounts.exs

current_balance = Account.balance(1000, 200)
IO.puts "Current balance: US $#{current_balance}"
```

OBS: The language infers the data types.
OBS: We use the `#{}` to do string interpolation.

```bash
# First we need to have installed the `elixir` runtime to run it. Then we just
call it with our main file.

elixir account.exs
```

OBS: For install information on Elixir use this [site](http://elixir-lang.org)

Pure Functions
---

- Two check if a funcion is pure we must check this two things:
	1. Return value relying entirely on arguments.
	2. Must not cause any side effect.
- Pure functions makes programs easier to reason about.

Pipe Operator
---

- To many nested functions is a bad practise.
- The pipe operator `|>` takes the output from the expression on the left and passes
it as the first argument to the function call on the right.

```Elixir
defmodule Account do

	def balance(initial, spending) do
		discount(initial, 10) 
		|> interest(0.1)
		|> format('$')
	end

# ...

end
```

OBS: Similar to UNIX pipes.

- The `Enum.sum` function from Elixir's standard library returns the sum of all
individual elementes passed as argument.

```Elixir
defmodule Accounts do

	def print_sum do
		1..10
		|> Enum.sum
		|> IO.puts
	end

end
```

OBS: The two dots `1..10` create a range from 1 to 10.

Pattern Matching
---

- The '=' symbol in Elixir is called the **match operator**. It matches values
on one side against corresponding structures on the other side.
- Elixir tries to find a way to make one side match the other side.
- For example on the statement `language = "Elixir"` the string on the right
will be *matched* to the empty variable on the left.

- The '<>' symbol in Elixir is called the **string concatenation operator**. It
extracts a string starting with a given prefix.

```Elixir
"Jose " <> last_name = "Jose Valim"
IO.puts last_name
# "Valim"

# Elixir match operator matches the second part of the string, spliced by using
the "Jose " prefix.

"Jose " <> last_name = "Valim"
IO.puts last_name
# ** (MatchError) no match of right hand side vale: "Valim"

# I wasn't able to find a match from the right side value.
```

- Elixir uses `[]` to specify a list.

```Elixir
data = ["Elixir", "Valim"]
IP.puts data
# "ElixirValim"

[lang, author] = data
IO.puts "#{lang}, #{author}"
# "Elixir, Valim"

# On the last use of the match operator, Elixir manages to match the elements on
the right list to those on the right. The result is an "assignment" of the
values on the list to each variable.
```

- The use of `if` statements in functional programming is less common.

```Elixir
# Let's say we are creating a function inside the Accounts module called
run_transaction. This function can be called in two different ways:
# 1. Account.run_transaction(1000, 50, :deposit)
# 2. Account.run_transaction(1050, 30, :withdrawal)

defmodule Account do

	# We could use an if statement to check on the type.
	# A better way is to use function clauses.
	def run_transaction(balance, amount, :deposit) do
	end

	def run_transaction(balance, amount, :withdrawal) do
	end
end
```

OBS: A string that starts with a `:` is called an Atom. Is a more memory
efficient string.
OBS: Function definitions can be defined multiple times with different
arguments. Elixit will use pattern matching to select the correct funcion
definition according to the arguments defined on each call. This multiple
funcion definitions are called "clauses"

Anonymous Functions
---

- Functions are first class citizens:
	1. Functions can be assigned to variables.
	2. Functions can be passed as arguments.
- Functions have a name and belong to a modules.
- We used the module plus the function name to call them.
-	Anonymous functions have no name and no modules.
- Anonymous functions are created by using the `fn ->` syntax.

```Elixir
max_balance = fn(amount) -> "Max: #{amount}" end
```

OBS: Anonymous functions can be assigned to variables.

- To call anonymous functions we must use the `.( )` syntax.

```Elixir
max_balance.(500)
```

- Named functions can take anonymous functions as arguments. This helps promote
*docupling*.

```Elixir
# deposit and withdrawal are anonymous functions.
Account.run_transaction(100, 20, deposit)
Account.run_transaction(100, 20, withdrawal)
# The logic of how to run a transaction is defined on the run_transaction
	function definition. While the logic of each individual transaction is stored
	inside each anonymous function.
```

- An example of the `run_transaction` function can be:

```Elixir
defmodule Account do

	def run_transaction(balance, amount, transaction) do
		if balance <= 0 do
			"Cannot perform any transaction"
		else
			transaction.(balance, amount)	
		end

	end

end
```

OBS: The `if` statement represents logic for performing the transaction while the
logic for each individual transaction is on the supplied `transaction` function.

- Let's define each anonymous functions:

```Elixir
deposit = fn(balance, amount) -> balance + amount end
withdrawal = fn(balance, amount) -> balance - amount end
```

- Anonymous functions can have multiple clauses.

```Elixir
account_transaction = fn
	(balance, amount, :deposit) -> balance + amount
	(balance, amount, :withdrawal) -> balance - amount
end
```

OBS: Check the location of the `->` symbol when defining an anonymous function
with clauses.

- We can use the `&` operator to define anonymous functions in a more concise
way.

```Elixir
deposit = fn(balance, amount) -> balance + amount end
deposit = &(&1, &2)
```

OBS: The `&x` is a way to represent the arguments of the functions, starting for
the first one.

- This shorthand functions can also be found inline on other functions.

```Elixir
Account.run_transaction(1000, 20, &(&1 + &2))
Enum.map([1, 2, 3, 4], &(&1 * 2))
```





